import router from '@/router';

function handleNetworkError(error) {

    switch (error.type) {
        case 'NETWORK_OFFLINE':
        case 'NETWORK_TIMEOUT':
        case 'NETWORK_ERROR':
          console.log('❌ (networkError) Network error!');

        break;

        case 'NOT_FOUND':
          console.log('❌ (networkError) Not found!');

          if(error.redirectToNotFound) {
            router.push({ name: 'not-found' });
          }
        break;
    
        default:
            console.log('❌ (networkError) Unknown error');
        break;
    }
}

export {
    handleNetworkError
}