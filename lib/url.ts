import { url } from "inspector";
import qs from "query-string";
interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}
interface UrlRemoveQueryParams {
  params: string;
  keysToRemove: string[];
}
export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  //*convert to object with key and value
  const queryString = qs.parse(params);
  //console.log(queryString, "queryString");
  //console.log(value, "value");
  queryString[key] = value;
  return qs.stringifyUrl({
    url: window.location.pathname,
    query: queryString,
  });
};
export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: UrlRemoveQueryParams) => {
  const queryString = qs.parse(params);
  keysToRemove.forEach((key) => {
    delete queryString[key];
  });
  //!Stringify an object into a query string and sorting the keys.
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: queryString,
    },
    { skipNull: true }
  );
};
