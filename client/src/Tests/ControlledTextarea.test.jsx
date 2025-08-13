import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ControlledTextarea } from "../Components/UsedInputs";

describe("ControlledTextarea", () => {
  it("should auto-focus when mounted", () => {
    render(
      <ControlledTextarea
        label="Description"
        name="desc"
        placeholder="Enter text..."
        value=""
        onChange={() => {}}
      />
    );

    const textarea = screen.getByPlaceholderText(/enter text/i);
    expect(document.activeElement).toBe(textarea); // This will FAIL
  });

  it("should update the value when user types", async () => {
    const user = userEvent.setup();
    let value = "";
    const handleChange = (e) => { value = e.target.value; };

    render(
      <ControlledTextarea
        label="Description"
        name="desc"
        placeholder="Enter text..."
        value={value}
        onChange={handleChange}
      />
    );

    const textarea = screen.getByPlaceholderText(/enter text/i);
    await user.type(textarea, "Hello");

    expect(value).toBe("Hello"); // Might FAIL if not wired correctly
  });
});
