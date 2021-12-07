function introspectionProvider(query) {
  return fetch('/graphql/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json', // not allowed for no-cors
    },
    body: JSON.stringify({ query: query }),
  }).then((response) => response.json());
}

function initGraphQLVoyager() {
  GraphQLVoyager.init(document.getElementById('voyager'), {
    introspection: introspectionProvider,
  });
}

(async () => {
  try {
    const keycloak = new Keycloak({
      url: 'https://inventagedb.inventage.com:7443/auth', // bypass wds proxy
      //url: '/auth/', // use wds proxy
      realm: 'ierp',
      clientId: 'vuerp'
    });

    const authenticated = await keycloak.init({ onLoad: 'check-sso' });

    if (authenticated) {
      console.error('Initialized and authenticated');
      initGraphQLVoyager();
    } else {
      console.error('Initialized but not authenticated');
    }
    return;

  } catch (e) {
    console.error('Keycloak failed to initialize', e);
  }
})()

Aufgrund der Fehlermeldung `Access to fetch at 'inventagedb.inventage.com:7443/auth/' from origin 'http://localhost:8000' has been blocked by CORS policy.` schliesse ich darauf, dass der lokale WDS der Ursprung des Problems ist. Daher meine ich man muss auch für `/auth/` einen Proxy erstellen.