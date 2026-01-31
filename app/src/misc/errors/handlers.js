function handleNetworkError(error) {

    switch (error.type) {
        case 'NETWORK_OFFLINE' || 'NETWORK_TIMEOUT' || 'NETWORK_ERROR':
          alert('Network error!');

        break;

        case 'NOT_FOUND':
          alert('Not found!');
        break;
    
        default:
            alert('Unknown error');
        break;
    }
}

export {
    handleNetworkError
}