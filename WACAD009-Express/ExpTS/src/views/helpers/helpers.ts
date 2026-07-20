import Handlebars from 'handlebars';
import { Technology } from './helpersTypes';

const listTechnologies = (technologies: Technology[]) => {
  const items = technologies
    .filter((technology) => technology.poweredByNodejs)
    .map(
      (technology) =>
        `<li>${Handlebars.escapeExpression(technology.name)} - ${Handlebars.escapeExpression(technology.type)}</li>`,
    );

  return new Handlebars.SafeString(`<ul>${items.join('')}</ul>`);
};

export default { listTechnologies };
