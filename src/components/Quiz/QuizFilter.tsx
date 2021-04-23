import { ChangeEventHandler, FunctionComponent } from "react";
import { Button, Columns, Form } from "react-bulma-components";

export interface QuizFilterProps {
  sortBy: string;
  onSortChange: ChangeEventHandler<HTMLSelectElement>;

  query: string;
  onQueryChange: ChangeEventHandler<HTMLInputElement>;
  onSearch: () => void;
}

const QuizFilter: FunctionComponent<QuizFilterProps> = ({
  sortBy, onSortChange, query, onQueryChange, onSearch
}) => (
  <Columns>
    <Columns.Column>
      <Form.Field>
        <Form.Control>
          <Form.Select
            title="Sort by"
            value={sortBy}
            onChange={onSortChange}
          >
            <option value="created">Time created</option>
            <option value="playCount">Times played</option>
          </Form.Select>
        </Form.Control>
      </Form.Field>
    </Columns.Column>

    <Columns.Column narrow>
      <Form.Field kind="addons">
        <Form.Control>
          <Form.Input
            type="text"
            placeholder="Search for quizzes"
            value={query}
            onChange={onQueryChange}
          />
        </Form.Control>

        <Form.Control>
          <Button color="link" type="button" onClick={onSearch}>
            Search
          </Button>
        </Form.Control>
      </Form.Field>
    </Columns.Column>
  </Columns>
);

export default QuizFilter;
