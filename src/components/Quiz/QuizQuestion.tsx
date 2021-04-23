import { Question, QuestionOption } from "@types";
import { Fragment, FunctionComponent } from "react";
import { Columns, Heading } from "react-bulma-components";

import QuizOption from "./QuizOption";

interface QuizQuestionProps extends Omit<Question, "id" | "quiz_id"> {
  selectedOption?: number;
  shouldMark: boolean;
  onToggle: (option: QuestionOption) => void;
}

const QuizQuestion: FunctionComponent<QuizQuestionProps> = ({
  onToggle, prompt, selectedOption, options, shouldMark
}) => (
  <Fragment>
    <Heading size={4}>{prompt}</Heading>

    <Columns multiline className="is-mobile">
      {options.map(({ id, ...rest }, index) => (
        <Columns.Column
          key={id}
          tablet={{
            size: 4,
            offset: index % 2 === 0 ? 2 : undefined
          }}
          mobile={{
            size: 6
          }}
        >
          <QuizOption
            selected={selectedOption === id}
            shouldMark={shouldMark}
            onClick={() => onToggle({
              id,
              ...rest
            })}
            {...rest}
          />
        </Columns.Column>
      ))}
    </Columns>
  </Fragment>
);

export default QuizQuestion;
