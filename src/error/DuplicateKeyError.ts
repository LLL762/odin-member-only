export class DuplicateKeyError extends Error {
  private readonly _messages: string[] = [];

  constructor(messages: string[]) {
    super(messages.join(", "));
    this.name = "DuplicateKeyError";
    this._messages = messages;
  }

  public get messages(): string[] {
    return this._messages;
  }
}

export const createDuplicateKeyError = (message: string[]) => {};
