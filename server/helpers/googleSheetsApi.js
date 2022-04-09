import { GoogleSpreadsheet } from 'google-spreadsheet'
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

export const appendRow = async (data) => {
    const doc = new GoogleSpreadsheet(
        '1XZekf6s7_eItsJuINiWqiRkYnIR_bu6H2nER28jY-7A'
    )

    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    })

    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]

    return sheet.addRows(data)
}
