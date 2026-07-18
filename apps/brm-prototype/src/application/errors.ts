export class UnknownBlueprintError extends Error {
  constructor(public readonly blueprintId: string) {
    super(`Unknown blueprint id: ${blueprintId}`);
    this.name = "UnknownBlueprintError";
  }
}

export class InvalidBlueprintAlternativeError extends Error {
  constructor(
    public readonly alternativeId: string,
    public readonly blueprintId: string,
  ) {
    super(`Alternative "${alternativeId}" is not valid for blueprint "${blueprintId}"`);
    this.name = "InvalidBlueprintAlternativeError";
  }
}

export class NoCurrentQuestionError extends Error {
  constructor(
    public readonly blueprintId: string,
    public readonly index: number,
  ) {
    super(`No current question for blueprint "${blueprintId}" at index ${index}`);
    this.name = "NoCurrentQuestionError";
  }
}
