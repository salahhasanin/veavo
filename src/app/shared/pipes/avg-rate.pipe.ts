import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "avgRate",
})
export class AvgRatePipe implements PipeTransform {
  transform(items: any[], attr: any): any {
    if (!items || !items.length) {
      return items;
    } else {
      let sum = items.reduce((a, b) => a + b[attr], 0);
      return sum / items.length;
    }
  }
}
