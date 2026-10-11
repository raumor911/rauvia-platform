import React, { useMemo } from 'react';
import { normalizeEditorialHtml } from '../lib/editorial';
export { normalizeEditorialHtml, sanitizeTitleHtml } from '../lib/editorial';
import './RauviaEditorial.css';

interface RauviaEditorialProps { htmlContent: string; articleTitle?: string; }

export default function RauviaEditorial({ htmlContent, articleTitle }: RauviaEditorialProps) {
  const html = useMemo(
    () => normalizeEditorialHtml(htmlContent, articleTitle),
    [htmlContent, articleTitle],
  );
  return <div className="rauvia-editorial-v2" dangerouslySetInnerHTML={{ __html: html }} />;
}
