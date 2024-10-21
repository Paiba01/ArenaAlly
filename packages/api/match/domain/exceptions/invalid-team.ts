import { Exception } from "~/shared/domain";

export class InvalidTeam extends Exception {
  static causeIsBlank(): InvalidTeam {
    return Exception.with('Team name cannot be blank')
  }
}