// defineModel.ts
import { Sequelize, Model, ModelAttributes, ModelStatic, ModelCtor } from 'sequelize';

/* 
  com essa abordagem, conseguimos criar um modelo com opcoes padroes, e não precisamos lembrar a cada novo model de colocar o tiestamp false
  ou qualquer outra opção desejada
*/

export function defineModel<M extends Model>(
  sequelize: Sequelize,
  modelName: string,
  attributes: ModelAttributes<M>,
  options: Record<string, unknown> = {}
): ModelStatic<M> {
  return sequelize.define<M>(modelName, attributes, {
    ...options,
    timestamps: false //com isso os campos createdAt e updatedAt não são criados - se desejar os campos será preciso criar por conta
  }) as ModelStatic<M>;
}
