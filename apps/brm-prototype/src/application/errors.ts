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

export class IncompleteResearchJourneyError extends Error {
  constructor(
    public readonly missingStageIds: string[],
    public readonly blockingReasons: string[],
    public readonly missingRequiredQuestionIds: string[] = [],
  ) {
    const stageList =
      missingStageIds.length > 0 ? missingStageIds.join(", ") : "required journey steps";
    super(`Research journey is incomplete: ${stageList}`);
    this.name = "IncompleteResearchJourneyError";
  }
}

export class JourneyStageNotAvailableError extends Error {
  constructor(
    public readonly stageId: string,
    public readonly recommendedStageId: string,
  ) {
    super(
      `Journey stage "${stageId}" is not available yet. Continue from "${recommendedStageId}".`,
    );
    this.name = "JourneyStageNotAvailableError";
  }
}
