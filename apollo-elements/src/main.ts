import '@apollo-elements/components/apollo-client';
import { ApolloClientElement } from '@apollo-elements/components/apollo-client';

import { _client } from './client';

import './components/app';

const clientWrapper = document.getElementById('client') as ApolloClientElement;

clientWrapper.client = _client;

customElements.whenDefined('apollo-app')
  .then(() => document.body.removeAttribute('unresolved'));
