import * as fs from 'fs';
import { parse } from 'csv-parse/sync';

export class DataProvider{

    static GetTestDataFromJson(filePath: string) {

        let Data: any = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return Data;
    }


    static GetTestDataFromCSV(filePath: string) {
        
        let Data: any = parse(fs.readFileSync(filePath), { columns: true, skip_empty_lines: true })
        return Data;
    }


}