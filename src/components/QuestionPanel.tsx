import * as React from "react";
import Panel from "./Panel";
import Heading from "./Heading";
import InputGroup from "./InputGroup";
import Input from "./Input";
import Button from "./Button";
import Paragraph from "./Paragraph";
import Lifebar from "./Lifebar";

interface Props {
  onSubmit: (input: string) => void;
  startedAt: Date;
  endsAt: Date;
}

export default function QuestionPanel({ onSubmit, startedAt, endsAt }: Props) {
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
        <Paragraph as={InputGroup}>
          <Input
            id="answer"
            type="text"
            placeholder="Submit your answer..."
            onChange={(event) => setInput(event.currentTarget.value)}
            value={input}
            autoFocus
          />
          <Button type="submit">Send</Button>
        </Paragraph>
        <Lifebar startedAt={startedAt} endsAt={endsAt} />
      </form>
    </Panel>
  );
}
