type DesignateRefereesType = {
  id: string
  referee1: string
  referee2: string
}

export class DesignateReferees implements DesignateRefereesType {
  private constructor(
    readonly id: DesignateRefereesType['id'],
    readonly referee1: DesignateRefereesType['referee1'],
    readonly referee2: DesignateRefereesType['referee2'],

  ) {}

  static with({ id, referee1, referee2 }: DesignateRefereesType): DesignateReferees {
    return new this(id, referee1, referee2)
  }
}
