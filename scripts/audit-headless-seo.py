#!/usr/bin/env python3
"""Read-only public audit. Python 3 standard library; no credentials required."""
import argparse
import concurrent.futures
import datetime
import html.parser
import json
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

CMS = 'https://blog.rauvia.com.mx'
MAIN = 'https://rauvia.com.mx'


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args):
        return None


class Metadata(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonicals = []
        self.robots = []
        self.title = ''
        self.in_title = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'link' and attrs.get('rel', '').lower() == 'canonical':
            self.canonicals.append(attrs.get('href'))
        if tag == 'meta' and attrs.get('name', '').lower() in ('robots', 'googlebot'):
            self.robots.append(attrs.get('content', ''))
        if tag == 'title':
            self.in_title = True

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data


def fetch(url, method='GET'):
    try:
        req = urllib.request.Request(url, method=method, headers={'User-Agent': 'RAUVIA-Headless-SEO-Audit/1.0'})
        try:
            response = urllib.request.build_opener(NoRedirect()).open(req, timeout=25)
        except urllib.error.HTTPError as exc:
            response = exc
        with response:
            body = response.read(4_000_000).decode('utf-8', 'replace')
            headers = {key.lower(): value for key, value in response.headers.items()}
            metadata = Metadata()
            metadata.feed(body)
            return dict(url=url, method=method, status=response.code, headers=headers,
                        canonical=metadata.canonicals, robots=metadata.robots, title=metadata.title, body=body)
    except Exception as exc:
        return dict(url=url, method=method, error=str(exc), body='')


def inventory(kind):
    result = []
    page = 1
    while True:
        response = fetch(f'{CMS}/wp-json/wp/v2/{kind}?per_page=100&page={page}')
        if response.get('status') != 200:
            raise RuntimeError(f'Cannot list {kind}: {response}')
        data = json.loads(response['body'])
        if not isinstance(data, list):
            raise RuntimeError(f'Unexpected {kind} response')
        result.extend(data)
        if page >= int(response['headers'].get('x-wp-totalpages', 1)):
            return result
        page += 1


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--phase', choices=('before', 'after'), default='before')
    parser.add_argument('--output', default='headless-seo-audit.json')
    args = parser.parse_args()
    posts = inventory('posts')
    categories = inventory('categories')
    tags = inventory('tags')
    checks, errors = [], []
    targets = []
    for post in posts:
        slug = urllib.parse.quote(urllib.parse.unquote(post['slug']), safe='')
        target = f'{MAIN}/recursos/{slug}/'
        targets.append((post, target))
    jobs = [(target, 'GET') for _, target in targets]
    jobs += [(post['link'], method) for post, _ in targets for method in ('GET', 'HEAD')]
    shop = 'https://shop.rauvia.com.mx/b/starter-microempresas'
    jobs += [(shop, 'GET'), (shop + '?utm_source=audit', 'HEAD')]
    editorial = [CMS + '/', CMS + '/feed/'] + [item['link'] for item in (categories[:1] + tags[:1])]
    jobs += [(url, 'GET') for url in editorial]
    jobs += [(CMS + '/wp-sitemap.xml', 'GET'), (MAIN + '/sitemap.xml', 'GET'),
             (CMS + '/wp-json/wp/v2/media?per_page=1', 'GET'),
             (CMS + '/wp-login.php', 'GET')]
    if posts:
        jobs.append((posts[0]['link'] + '?preview=true', 'GET'))
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        checks = list(pool.map(lambda job: fetch(*job), jobs))
    by_key = {(r['url'], r['method']): r for r in checks}
    for post, target in targets:
        r = by_key[(target, 'GET')]
        if r.get('status') != 200 or r.get('canonical') != [target]:
            errors.append(f'Destination unavailable or canonical incorrect: {target}')
        if 'noindex' in (r.get('headers', {}).get('x-robots-tag', '') + ' '.join(r.get('robots', []))).lower():
            errors.append(f'Destination is noindex: {target}')
        if args.phase == 'after':
            for method in ('GET', 'HEAD'):
                r = by_key[(post['link'], method)]
                if r.get('status') != 301 or r.get('headers', {}).get('location') != target:
                    errors.append(f'Expected direct 301: {method} {post["link"]}')
    for url, method in [(shop, 'GET'), (shop + '?utm_source=audit', 'HEAD')]:
        r = by_key[(url, method)]
        if r.get('status') != 301 or r.get('headers', {}).get('location') != MAIN + '/':
            errors.append(f'Shop redirect incorrect: {url}')
    if args.phase == 'after':
        for url in editorial:
            r = by_key[(url, 'GET')]
            if 'noindex' not in r.get('headers', {}).get('x-robots-tag', '').lower():
                errors.append(f'CMS noindex header missing: {url}')
        r = by_key[(CMS + '/wp-sitemap.xml', 'GET')]
        if r.get('status') == 200 and 'noindex' not in r.get('headers', {}).get('x-robots-tag', '').lower():
            errors.append('CMS sitemap still indexable')
    r = by_key[(MAIN + '/sitemap.xml', 'GET')]
    try:
        tree = ET.fromstring(r['body'])
        locations = {item.text for item in tree.iter() if item.tag.endswith('}loc') or item.tag == 'loc'}
        for _, target in targets:
            if target not in locations:
                errors.append(f'Main sitemap missing {target}')
    except ET.ParseError:
        errors.append('Main sitemap is not XML')
    for r in checks:
        if r.get('error'):
            errors.append(f'HTTP check failed: {r["url"]}: {r["error"]}')
        if '/wp-json/wp/v2/media' in r['url']:
            try:
                if r.get('status') != 200 or not isinstance(json.loads(r['body']), list):
                    errors.append('Media REST API unavailable')
            except ValueError:
                errors.append('Media REST API returned non-JSON')
        if '/wp-login.php' in r['url'] or '?preview=true' in r['url']:
            if '/recursos/' in r.get('headers', {}).get('location', ''):
                errors.append(f'CMS protected flow was redirected: {r["url"]}')
        r.pop('body', None)
    report = dict(checked_at=datetime.datetime.now(datetime.timezone.utc).isoformat(), phase=args.phase,
                  published_posts=len(posts), errors=errors, checks=checks)
    Path(args.output).write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding='utf-8')
    print(f'{len(posts)} articles; {len(checks)} HTTP checks; {len(errors)} errors. {args.output}')
    for error in errors:
        print(error)
    return bool(errors)


if __name__ == '__main__':
    raise SystemExit(main())
