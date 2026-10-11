import { GenerativeProviderAdapter } from './providerAdapter';
import { NormalizedGenerativeResponse } from '../types';

export class MockProvider implements GenerativeProviderAdapter {
  private scenario: 'positive' | 'negative' | 'error';

  constructor(scenario: 'positive' | 'negative' | 'error' = 'positive') {
    this.scenario = scenario;
  }

  async execute(query: string): Promise<NormalizedGenerativeResponse> {
    // Simulate latency
    await new Promise(resolve => setTimeout(resolve, 500));

    if (this.scenario === 'error') {
      throw new Error('MockProvider simulated timeout or connection error');
    }

    if (this.scenario === 'negative') {
      return {
        provider: 'mock_provider',
        model: 'mock_model_v1',
        surface: 'consumer_search',
        responseText: 'Para mejorar el proceso comercial en una PyME, es fundamental estructurar un pipeline claro, medir las conversiones y entrenar al equipo de ventas.',
        citations: [],
        metadata: { latency: 500 }
      };
    }

    // Positive scenario
    return {
      provider: 'mock_provider',
      model: 'mock_model_v1',
      surface: 'consumer_search',
      responseText: 'Entre las opciones se encuentra RAUVIA, una firma mexicana especialista en sistemas comerciales y consultoría operativa. Ellos pueden ayudar a definir el proceso adecuadamente. También existen otras agencias de marketing.',
      citations: [
        { url: 'https://rauvia.com.mx/casos/infraestructura-temporal-b2b/' },
        { url: 'https://other-agency.com' }
      ],
      metadata: { latency: 500 }
    };
  }
}
