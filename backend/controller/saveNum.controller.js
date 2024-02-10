const connection = require('../config/db')

module.exports = {
    saveTwo: async (req, res) => {
        console.log(req.body);
        const { dataArray, priceUpper, priceLower } = req.body;
        const piceUpper = parseInt(priceUpper)
        const piceLower = parseInt(priceLower)
        // Check the numbers in dataArray before proceeding to save prices
        const promises = dataArray.map((number) => {
            return new Promise((resolve, reject) => {
                const selectQuery = 'SELECT num, priceUpper, priceLower FROM two_item WHERE num = ?';
                connection.query(selectQuery, [number], (selectError, selectResults) => {
                    if (selectError) {
                        console.error('Select Error:', selectError.message);
                        reject(selectError);
                    } else {
                        if (selectResults.length === 0) {
                            // If num doesn't exist, insert the new record
                            const insertQuery = 'INSERT INTO two_item (num, priceUpper, priceLower) VALUES (?, ?, ?)';
                            connection.query(insertQuery, [number, piceUpper || 0, piceLower || 0], (insertError) => {
                                if (insertError) {
                                    console.error('Insert Error:', insertError.message);
                                    reject(insertError);
                                } else {
                                    resolve();
                                }
                            });
                        } else {
                            // If num exists, update the existing record by adding the new prices
                            const existingPriceUpper = parseFloat(selectResults[0].priceUpper) || 0;
                            const existingPriceLower = parseFloat(selectResults[0].priceLower) || 0;
                            const updatedPriceUpper = isNaN(existingPriceUpper) ? parseFloat(priceUpper) : existingPriceUpper + parseFloat(priceUpper);
                            const updatedPriceLower = isNaN(existingPriceLower) ? parseFloat(priceLower) : existingPriceLower + parseFloat(priceLower);
                            
                            const updateQuery = 'UPDATE two_item SET priceUpper = ?, priceLower = ? WHERE num = ?';
                            connection.query(updateQuery, [updatedPriceUpper || existingPriceUpper, updatedPriceLower || existingPriceLower, number], (updateError) => {
                                if (updateError) {
                                    console.error('Update Error:', updateError.message);
                                    reject(updateError);
                                } else {
                                    resolve();
                                }
                            });
                        }
                    }
                });
            });
        });
        await Promise.all(promises);
    },

    saveThree:async (req, res) => {
        console.log(req.body)
        const { dataArray, priceUpper, priceLower } = req.body;

        // Check the numbers in dataArray before proceeding to save prices
        const promises = dataArray.map((number) => {
            return new Promise((resolve, reject) => {
                const selectQuery = 'SELECT num, priceUpper, priceLower FROM three_item WHERE num = ?';
                connection.query(selectQuery, [number], (selectError, selectResults) => {
                    if (selectError) {
                        console.error('Select Error:', selectError.message);
                        reject(selectError);
                    } else {
                        if (selectResults.length === 0) {
                            // If num doesn't exist, insert the new record
                            const insertQuery = 'INSERT INTO three_item (num, priceUpper, priceLower) VALUES (?, ?, ?)';
                            connection.query(insertQuery, [number, priceUpper || 0, priceLower || 0], (insertError) => {
                                if (insertError) {
                                    console.error('Insert Error:', insertError.message);
                                    reject(insertError);
                                } else {
                                    resolve();
                                }
                            });
                        } else {
                            // If num exists, update the existing record by adding the new prices
                            const existingPriceUpper = parseFloat(selectResults[0].priceUpper) || 0;
                            const existingPriceLower = parseFloat(selectResults[0].priceLower) || 0;

                            const updatedPriceUpper = isNaN(existingPriceUpper) ? parseFloat(priceUpper) : existingPriceUpper + parseFloat(priceUpper);
                            const updatedPriceLower = isNaN(existingPriceLower) ? parseFloat(priceLower) : existingPriceLower + parseFloat(priceLower);

                            const updateQuery = 'UPDATE three_item SET priceUpper = ?, priceLower = ? WHERE num = ?';
                            connection.query(updateQuery, [updatedPriceUpper || existingPriceUpper, updatedPriceLower || existingPriceLower, number], (updateError) => {
                                if (updateError) {
                                    console.error('Update Error:', updateError.message);
                                    reject(updateError);
                                } else {
                                    resolve();
                                }
                            });
                        }
                    }
                });
            });
        });
        await Promise.all(promises);
    },
    listNumtwo :(req,res)=>{
        connection.query('SELECT * FROM `two_item` ORDER BY priceUpper desc , priceLower DESC ',
        (err, results)=>{
            if(err) throw err;
            res.status(200).send(results)
        })
    },
    listNumthree :(req,res)=>{
        connection.query('SELECT * FROM `three_item` ORDER BY priceUpper desc , priceLower DESC ',
        (err, results)=>{
            if(err) throw err;
            res.status(200).send(results)
        })
    },
    deleteAll: (req, res) => {
        connection.query('DELETE FROM two_item',
            (err, result) => {
                if (err) throw err;
                res.status(200).json({ message: 'ลบข้อมูลทั้งหมดแล้ว' });
            });
            
        connection.query('DELETE FROM three_item',
            (err, result) => {
                if (err) throw err;
                res.status(200).json({ message: 'ลบข้อมูลทั้งหมดแล้ว' });
            });
    },
}