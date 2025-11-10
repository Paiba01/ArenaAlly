import { Exception } from "~/shared/domain";

export class InvalidDate extends Exception {
  static causeIsPast(): InvalidDate{
    return Exception.with('Match date can not be a past date')
  }
}