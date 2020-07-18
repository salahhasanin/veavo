import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "intNumber",
})
export class IntNumberPipe implements PipeTransform {
  num: number;

  transform(value: any, ...args: any[]): any {
    this.num = Math.round(value);
    return this.num;
  }
}
