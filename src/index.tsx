interface Operation {
  date: Date;
  amount: number;
}

function OperationComponent({ date, amount }: Operation): HTMLElement {
  const element: HTMLDivElement = document.createElement("div");
  element.setAttribute("class", "operation");
  const dateNode: Text = document.createTextNode(date.toDateString());
  element.appendChild(dateNode);
  const separatorNode: Text = document.createTextNode(" | ");
  element.appendChild(separatorNode);
  const amountNode: Text = document.createTextNode(
    (amount >= 0 ? "+" : "") + amount.toString()
  );
  element.appendChild(amountNode);
  return element;
}

function display(element: HTMLElement): void {
  const rootElement: HTMLElement | null = document.getElementById("root");
  if (rootElement !== null) {
    rootElement.appendChild(element);
  }
}

const operationHistory: Operation[] = [
  {
    date: new Date(2019, 5, 12),
    amount: 100
  },
  {
    date: new Date(2019, 5, 13),
    amount: -40
  }
];

operationHistory.map(OperationComponent).forEach(display);

export const module = undefined;
