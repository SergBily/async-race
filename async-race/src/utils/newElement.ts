export function customCreateNewElement<T extends HTMLElement = HTMLElement>(
  tag: string,
  classNames: Array<string>,
  innerText?: string,
  attributes: Record<string, string> = {}
): T {
  const tagElement = document.createElement(tag) as T;
  tagElement.classList.add(...classNames);
  tagElement.innerHTML = innerText ? innerText : "";
  Object.keys(attributes).forEach((key) =>
    tagElement.setAttribute(key, attributes[key])
  );
  return tagElement;
}

export function customInsertChilds<T extends HTMLElement = HTMLElement>(
  element: T,
  childs: HTMLElement[]
): void {
  childs.forEach((item) => element.appendChild(item));
}
