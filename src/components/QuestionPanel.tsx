import * as React from "react";
import Panel from "./Panel";
import Heading from "./Heading";
import Input from "./Input";
import Lifebar from "./Lifebar";

interface Props {
  onSubmit: (input: string) => void;
  remaining: number;
}

export default function QuestionPanel({ onSubmit, remaining }: Props) {
  const [input, setInput] = React.useState("");

  return (
    <Panel>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(input);
        }}
        autoComplete="off"
      >
        <Heading as="label" htmlFor="answer">
          What's the name of this card?
        </Heading>
        <Input
          id="answer"
          type="text"
          placeholder="Submit your answer..."
          onChange={(event) => setInput(event.currentTarget.value)}
          value={input}
          autoFocus
        />
        <Lifebar remaining={remaining} />
      </form>
    </Panel>
  );
}
