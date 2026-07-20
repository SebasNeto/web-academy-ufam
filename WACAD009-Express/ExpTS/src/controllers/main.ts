import { Request, Response } from 'express';
import { loremIpsum } from 'lorem-ipsum';

const professores = [
  { nome: 'David Fernandes', sala: 1238 },
  { nome: 'Horácio Fernandes', sala: 1233 },
  { nome: 'Edleno Moura', sala: 1236 },
  { nome: 'Elaine Harada', sala: 1231 },
];

const technologies = [
  { name: 'Express', type: 'Framework', poweredByNodejs: true },
  { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
  { name: 'React', type: 'Library', poweredByNodejs: true },
  { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
  { name: 'Django', type: 'Framework', poweredByNodejs: false },
  { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
  { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
];

const index = (req: Request, res: Response) => {
  res.render('main/index', { title: 'Hello World' });
};

const lorem = (req: Request, res: Response) => {
  const count = Number.parseInt(String(req.params.paragraphs), 10);

  if (!Number.isInteger(count) || count < 1 || count > 100) {
    res.status(400).render('main/error', {
      title: 'Parâmetro inválido',
      message: 'Informe um número de parágrafos entre 1 e 100.',
    });
    return;
  }

  const paragraphs = Array.from({ length: count }, () =>
    loremIpsum({ count: 1, units: 'paragraphs' }),
  );

  res.render('main/lorem', {
    title: 'Lorem Ipsum',
    paragraphs,
    count,
  });
};

const hb1 = (req: Request, res: Response) => {
  res.render('main/hb1', {
    title: 'Express + HBS',
    mensagem: 'Universidade Federal do Amazonas',
  });
};

const hb2 = (req: Request, res: Response) => {
  res.render('main/hb2', {
    title: 'Condição no Handlebars',
    poweredByNodejs: true,
    name: 'Express',
    type: 'Framework',
  });
};

const hb3 = (req: Request, res: Response) => {
  res.render('main/hb3', {
    title: 'Lista no Handlebars',
    professores,
  });
};

const hb4 = (req: Request, res: Response) => {
  res.render('main/hb4', {
    title: 'Helper do Handlebars',
    technologies,
  });
};

export default { index, lorem, hb1, hb2, hb3, hb4 };
