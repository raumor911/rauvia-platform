# Implementación de IndexNow

- **Estrategia (Pendiente de implementación automática completa):**
  Dado que es un sistema mixto (React estático + WordPress dinámico), se recomienda usar un Plugin de IndexNow en WordPress para notificar los posts, y un script HTTP POST (`curl`) en el proceso de CI/CD para notificar a Bing sobre las páginas de React tras cada despliegue.
- No se exponen claves de IndexNow en repositorios públicos.
