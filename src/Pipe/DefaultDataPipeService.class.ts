import { Injectable } from "@angular/core";

import { IDataPipeService } from "./IDataPipeService.interface";
import { ITableState } from "./../TableState/ITableState.interface";
import { IConfiguration } from "./../Configuration/IConfiguration.interface";
import { SortOrder } from "./../Sort/SortOrder.enum";

@Injectable()
export class DefaultDataPipeService<TTableState extends ITableState, TConfiguration extends IConfiguration> 
    implements IDataPipeService {

    public pipe(data: Array<any>, tableState: TTableState, configuration: TConfiguration): Promise<Array<any>> {
        if (!data || !Array.isArray(data)) {
            return Promise.resolve(undefined);
        }

        var resultArray = [].concat(data);

        resultArray = this.filter(resultArray, tableState, configuration);
        resultArray = this.sort(resultArray, tableState, configuration);
        resultArray = this.page(resultArray, tableState, configuration);
    
        return Promise.resolve(resultArray);
    }

    sort(data: Array<any>, tableState: TTableState, configuration: TConfiguration): Array<any> {
        if (!tableState.sort || !tableState.sort.predicate || tableState.sort.order === SortOrder.NotSet) 
            return data;
        
        return data.sort((a, b) => {
            // TODO: Implement configuration setting to help with aggresive minification by consumer
            var aValue = a[tableState.sort.predicate];
            var bValue = b[tableState.sort.predicate];

            // null or undefined values should be first
            if (!aValue) return 1;

            var filter = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;

            // Descending order only if items not equal, and descending selected.
            if (tableState.sort.order === SortOrder.Descending
                && filter !== 0) {
                filter = filter * -1
            };

            return filter;
        });

    }

    filter(data: Array<any>, tableState: TTableState, configuration: TConfiguration): Array<any> {
        // TODO: Implement filtering
        return data;
    }

    page(data: Array<any>, tableState: TTableState, configuration: TConfiguration): Array<any> {
        if (!tableState.pagination || !tableState.pagination.pageSize)
            return data;

        tableState.pagination.totalItemCount = data.length;

        return data.slice(tableState.pagination.start, tableState.pagination.start + tableState.pagination.pageSize);
    }
    
}