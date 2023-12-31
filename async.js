const howManyCandlesCallback = (dayNumber, callback) => {
    if ( dayNumber < 1 ) {
             callback ('day cannot be smaller than 1');
    }

    if ( dayNumber > 8 ) {
        return callback ('No Isro Chag for Hannukah!');
    }

    return callback ( null, dayNumber + 1 );
}

// howManyCandlesCallback (9, (err, result) => {
//     if (err) {
//         return console.log(err)
//     }
//     return console.log(result);
// })


const howManyCandles = async (dayNumber) => {
    return new Promise ((resolve, reject) => {
        .howManyCandlesCallback(dayNumber, (err, result) => {
            if ( err ) {
                return reject(err);
            }
            return resolve(result);
        })
    });
}

howManyCandles(8).then((result) => {
    console.log(result);;
})