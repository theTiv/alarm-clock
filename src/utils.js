export function renderHtml(template, id) {
  const wrapper = document.getElementById(id);
  console.log(id, wrapper);
  if (wrapper) {
    wrapper.innerHTML = template;
  }
}
