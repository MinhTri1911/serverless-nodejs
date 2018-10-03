import Sequelize from "sequelize";

class Account {
  /**
   * Function define schema struct
   *
   * @returns {object} model of the table
   * @memberof Account
   */
  defineAccountSchema(db) {
    const model = db.define(
      "m_member",
      {
        client_id: {
          allowNull: false,
          type: Sequelize.STRING(10),
          primaryKey: true
        },
        member_pass: {
          allowNull: false,
          type: Sequelize.STRING(64),
          primaryKey: true
        },
        mail_address: {
          allowNull: false,
          type: Sequelize.STRING(20)
        }
      }, {
        schema: 'ticket1',
        timestamps: false,
        paranoid: true,
        tableName: "m_member",
      });

    // model.associate = function(models) {
    //   // associations can be defined here
    // };

    return model;
  }
}


class Member {
  /**
   * Function define schema struct
   *
   * @returns {object} model of the table
   * @memberof Account
   */
  defineMemberSchema(db) {
    const model = db.define(
      "m_member",
      {
        client_id: {
          allowNull: false,
          type: Sequelize.STRING(10),
          primaryKey: true
        },

        black_cd: {
          allowNull: true,
          type: Sequelize.STRING(3),
          primaryKey: true
        },
        admission_kb: {
          allowNull: true,
          type: Sequelize.STRING(2),
          primaryKey: true
        }
      },
        {
        schema: 'ticket1',
        timestamps: false,
        paranoid: true,
        tableName: "m_member",
      });

    // model.associate = function(models) {
    //   // associations can be defined here
    // };

    return model;
  }
}
export { Account, Member}
