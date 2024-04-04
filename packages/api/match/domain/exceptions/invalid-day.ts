import { Exception } from "~/shared/domain";

export class InvalidDay extends Exception {
  static causeIsNotInteger(): InvalidDay {
    return Exception.with('The day must be an integer number')
  }
}