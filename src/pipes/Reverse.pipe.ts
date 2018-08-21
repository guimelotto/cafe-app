import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "reverse"
})
export class Reverse implements PipeTransform {
  transform(value) {
    if (!value) return;
    return value.reverse();
  }
}
