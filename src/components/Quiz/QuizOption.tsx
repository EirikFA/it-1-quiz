import { QuestionOption } from "@types";
import { FunctionComponent } from "react";
import { Box, Icon } from "react-bulma-components";

import styles from "./QuizOption.module.scss";

interface QuizOptionProps extends Omit<QuestionOption, "id" | "question_id"> {
  selected: boolean;
  shouldMark: boolean;
  onClick: () => void;
}

const QuizOption: FunctionComponent<QuizOptionProps> = ({
  is_correct, onClick, shouldMark, selected, text
}) => {
  let boxClass = shouldMark ? styles.disabledBox : styles.box;

  if (selected) {
    if (shouldMark && !is_correct) {
      boxClass = styles.incorrect;
    } else boxClass = styles.selected;
  }

  if (shouldMark && is_correct) {
    boxClass = styles.correct;
  }

  return (
    <Box className={boxClass} onClick={onClick}>
      <label className={styles.label}>
        {text}
        <input type="checkbox" className="is-hidden" />

        {selected && (
          <Icon className={styles.icon}>
            <i className="fas fa-check" />
          </Icon>
        )}
      </label>
    </Box>
  );
};

export default QuizOption;
