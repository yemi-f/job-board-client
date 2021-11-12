import { render, screen } from "@testing-library/react";
import { TableBody, TableRow } from "./JobsTable";

describe("JobsTable", () => {
  test("table body loading data", async () => {
    render(<TableBody jobs={[]} pageNum={1} isLoading={true} />);

    expect(screen.getByTestId("spinner-div"));
  });

  test("table row", async () => {
    render(<TableRow job={jobs[0]} pageNum={1} />);

    const title = screen.getByText(jobs[0].title);
    const location = screen.getByText(jobs[0].location);
    const employmentType = screen.getByText(jobs[0].employmentType);
    const department = screen.getByText(jobs[0].department);
    const button = screen.getByRole("button");
    expect(title).toBeInTheDocument();
    expect(location).toBeInTheDocument();
    expect(employmentType).toBeInTheDocument();
    expect(department).toBeInTheDocument();
    expect(button).toHaveTextContent("Apply");
  });

  test("table body passed array with > 0 jobs", async () => {
    render(<TableBody jobs={jobs} pageNum={1} isLoading={false} />);

    expect(screen.getAllByTestId("table-row")).toHaveLength(jobs.length);
  });
});
const jobs = [
  {
    responsibilities: [
      "Nam pretium turpis et arcu",
      "Fusce vulputate eleifend sapien",
    ],
    requirements: [
      "Pellentesque auctor neque nec urna",
      "Sed cursus turpis vitae tortor",
    ],
    _id: "5ff5efbd67759d712d4f55bb",
    title: "Front-end web developer",
    department: "Information Technology",
    location: "Ottawa, ON",
    employmentType: "Part-Time",
    aboutThisRole:
      "Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  },
  {
    responsibilities: [
      "Vestibulum fringilla pede sit amet augue",
      "Morbi ac felis",
    ],
    requirements: [
      "Aenean vulputate eleifend tellus",
      "Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus",
    ],
    _id: "5ff5efbd67759d712d4f55bc",
    title: "Marketing director",
    department: "Marketing",
    location: "Toronto, ON",
    employmentType: "Contract",
    aboutThisRole:
      "Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.",
  },
];
