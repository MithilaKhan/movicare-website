import { baseApi } from "@/redux/base/baseApi";
 
export interface Service {
  _id: string;
  name: string;
  description: string;
  image: string;
  adults_price: number;
  kids_price: number;
  service_price: number;
  price_per_km: number;
  price_per_hour: number;
  taxs: number;
} 


const servicesSlice = baseApi.injectEndpoints({
  endpoints: (build) => ({     

    // all services 
    getServices: build.query({
      query: () => ({
        url: "/service",
      }),
      transformResponse: (response: { data: Service[] }) => response.data,
    }),  

    // single service by id 
    getServiceById: build.query<Service, string>({
      query: (id) => ({
        url: `/service/${id}`,
      }),
      transformResponse: (response: { data: Service }) => response.data,
    }), 


  }),
}); 

export const {useGetServicesQuery , useGetServiceByIdQuery} = servicesSlice;