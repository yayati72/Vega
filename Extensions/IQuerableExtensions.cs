﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Vega.Core.Models;
using Vega.Models;


namespace Vega.Extensions
{
    public static class IQuerableExtensions
    {
        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T>  query,IQueryObject queryObj,            
            Dictionary<string, Expression<Func<T, object>>> columnsMapping)
        {
            if (string.IsNullOrWhiteSpace(queryObj.SortBy) || !columnsMapping.ContainsKey(queryObj.SortBy))
                return query;

            if (queryObj.IsSortAscending)
                return query.OrderBy(columnsMapping[queryObj.SortBy]);
            else
                return query.OrderByDescending(columnsMapping[queryObj.SortBy]);
        }

        public static IQueryable<T> ApplyPaging<T> (this IQueryable<T> query, IQueryObject queryObj)
        {
            if (queryObj.PageSize <= 0)
                queryObj.PageSize = 10;
            if (queryObj.Page <= 0)
                queryObj.Page=1;
            return  query.Skip((queryObj.Page - 1) * queryObj.PageSize).Take(queryObj.PageSize);
        }
    }
}
