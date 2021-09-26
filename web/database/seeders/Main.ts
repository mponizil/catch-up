import { DateTime } from 'luxon'
import { partition, sample } from 'lodash'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

const TEMP_ASSET_HOST = 'http://127.0.0.1:8081'

const WAVES = [
  {
    startsAt: DateTime.local().minus({ hours: 2, minutes: 8 }).minus({ minutes: 30 }),
    endsAt: DateTime.local().minus({ hours: 2, minutes: 8 }),
  },
  {
    startsAt: DateTime.local().minus({ hours: 3, minutes: 8 }).minus({ minutes: 30 }),
    endsAt: DateTime.local().minus({ hours: 3, minutes: 8 }),
  },
  {
    startsAt: DateTime.local().minus({ hours: 1 }),
    endsAt: DateTime.local().plus({ hours: 1 }),
  },
  {
    startsAt: DateTime.local().minus({ hours: 12, minutes: 23 }).minus({ minutes: 30 }),
    endsAt: DateTime.local().minus({ hours: 12, minutes: 23 }),
  },
  {
    startsAt: DateTime.local().minus({ hours: 54, minutes: 54 }).minus({ minutes: 30 }),
    endsAt: DateTime.local().minus({ hours: 54, minutes: 54 }),
  },
  {
    startsAt: DateTime.local().minus({ hours: 23, minutes: 9 }).minus({ minutes: 30 }),
    endsAt: DateTime.local().minus({ hours: 23, minutes: 9 }),
  },
  {
    startsAt: DateTime.local().minus({ hours: 22, minutes: 13 }).minus({ minutes: 30 }),
    endsAt: DateTime.local().minus({ hours: 22, minutes: 13 }),
  },
]

export default class MainSeeder extends BaseSeeder {
  public async run() {
    const users = await User.createMany([
      {
        phone: '+17608463179',
        firstName: 'Misha',
        lastName: 'Ponizil',
      },
      {
        phone: '+16099336872',
        firstName: 'Dan',
        lastName: 'Shipper',
        photoUrl: `${TEMP_ASSET_HOST}/dan.jpg`,
      },
      {
        phone: '+13472003173',
        firstName: 'Hursh',
        lastName: 'Agrawal',
        photoUrl: `${TEMP_ASSET_HOST}/hursh.jpg`,
      },
      {
        phone: '+13019432825',
        firstName: 'Ian',
        lastName: 'Arnold',
        photoUrl: `${TEMP_ASSET_HOST}/ian.jpg`,
      },
      {
        phone: '+17604731669',
        firstName: 'David',
        lastName: 'Felzer',
        photoUrl: `${TEMP_ASSET_HOST}/felzer.jpg`,
      },
      {
        phone: '+17604026078',
        firstName: 'Anna',
        lastName: 'Kobara',
        photoUrl: `${TEMP_ASSET_HOST}/anna.jpg`,
      },
      {
        phone: '+13104259191',
        firstName: 'Paulina',
        lastName: 'Kurtz',
        photoUrl: `${TEMP_ASSET_HOST}/paulina.jpg`,
      },
      {
        phone: '+16517885604',
        firstName: 'Sawyer',
        lastName: 'Huff',
        photoUrl: `${TEMP_ASSET_HOST}/sawyer.jpg`,
      },
    ])

    const [[misha], others]: [User[], User[]] = partition(
      users,
      (user) => user.firstName === 'Misha'
    )
    await misha.related('contacts').createMany(
      others.map((other) => ({
        toUserId: other.id,
        firstName: other.firstName,
        lastName: other.lastName,
        photoUrl: other.photoUrl,
      }))
    )

    for (const user of others) {
      await user.related('waves').create(sample(WAVES))
    }
  }
}
