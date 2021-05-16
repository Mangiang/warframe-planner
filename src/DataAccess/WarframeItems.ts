import axios from "axios";
import crypto from "crypto";


const dataUrl = 'https://raw.githubusercontent.com/WFCD/warframe-items/master/data/json/All.json';

export interface ItemDataList {
    checksum: string
    value: string
}

export const getItemData = async (): Promise<ItemDataList> => {
    const rawData = await axios.get(dataUrl)
    const stringifiedData = JSON.stringify(rawData.data)
    const checksum = crypto.createHash('md5').update(stringifiedData).digest('hex');
    return {checksum, value: stringifiedData}
}