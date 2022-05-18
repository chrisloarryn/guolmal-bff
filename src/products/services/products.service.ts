import { Injectable, NotFoundException } from '@nestjs/common';

import { Product, Params } from './../entities/product.entity';
import { HttpService } from '@nestjs/axios';
import { isNil } from '@nestjs/common/utils/shared.utils';
import axios, { AxiosResponse } from 'axios';
import {date} from "joi";

@Injectable()
export class ProductsService {
  constructor(private readonly http: HttpService) {}

  private products: Product[] = [];

  async findAll({ searchText, id }: Params) {
    let findUrl = `http://localhost:8080/api/v1/products?`;
    // TODO: Implement search of products
    console.log(searchText.length, id.length);

    if (searchText !== '' && id === '') {
      findUrl += `s=${searchText}`;
    }
    if (searchText === '' && id !== '') {
      findUrl += `id=${id}`;
    }
    if (id !== '' && searchText && searchText?.length >= 3) {
      findUrl += `s=${searchText}`;
    }
    if (
      id !== '' &&
      searchText !== '' &&
      searchText &&
      searchText?.length < 3 &&
      id &&
      id?.length >= 1
    ) {
      findUrl += `id=${id}`;
    }

    console.log(findUrl);

    await axios
      .get(findUrl)
      .then((response) => {
        if (response.data.length > 0) {

          this.products = response.data?.map((p) => new Product(p).make());
        } else {
          this.products = [];
        }
      })
      .catch((error) => {
        this.products = [];
      });

    return this.products;
    // return this.http.get(findUrl).((data: AxiosResponse<any>) => {
    //   // console.log(data.data);
    //   if (isNil(data)) {
    //     this.products = [];
    //   }
    //   if (
    //     isNil(data.data?.message) ||
    //     data.data?.length == 0 ||
    //     data.data.message === 'Not Found'
    //   ) {
    //     this.products = [];
    //   }
    //
    //   if (data.statusText === 'OK' || data.status == 200) {
    //     this.products = data.data;
    //   }
    // });
  }
}
