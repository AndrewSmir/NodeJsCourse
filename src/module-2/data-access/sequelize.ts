import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'postgres://lhncmhvm:X39LCEp98OeKVd_DqMPcCp3VwnBhFydl@hattie.db.elephantsql.com:5432/lhncmhvm',
  { logging: console.log },
);