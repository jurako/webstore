function handleNetworkError(error) {

    switch (error.type) {
        case 'NETWORK_OFFLINE':
        case 'NETWORK_TIMEOUT':
        case 'NETWORK_ERROR':
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