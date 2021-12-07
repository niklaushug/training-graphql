import { LitElement, html, TemplateResult } from 'lit';
import { ApolloQueryController } from '@apollo-elements/core';
import { customElement } from 'lit/decorators.js';

import { AppQuery } from '../../schema';
// import { AppQuery } from '../../client.schema.graphql';  // Gleicher Fehler aber mit type `application/octet-stream`

import style from './app.css';
import shared from '../shared.css';

@customElement('apollo-app')
export class ApolloApp extends LitElement {
  static readonly is = 'apollo-app';

  static readonly styles = [shared, style];

  query = new ApolloQueryController(this, AppQuery);

  render(): TemplateResult {
    return html`
      <h2>ApolloApp</h2>
      <ul>
        ${this.query.data?.launchesPast.map((launch) => html`
            <li>${launch.mission_name}</li>
        `)}
      </ul>
    `;
  }
}
