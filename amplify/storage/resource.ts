import { defineFunction, defineStorage } from '@aws-amplify/backend';
import { sayHello } from '../functions/say-hello/resource';

export const storage = defineStorage({
  name: 'amplifyTeamDrive',
  triggers: {
    onUpload: defineFunction({
      entry: './on-upload-handler.ts'
    })
  },
  access: (allow) => ({
    'profile-pictures/{entity_id}/*': [
      allow.guest.to(['read']),
      allow.entity('identity').to(['read', 'write', 'delete'])
    ],
    'picture-submissions/*':
    [
      allow.resource(sayHello).to(['read', 'write', 'delete']),
      allow.authenticated.to(['read','write']),
      allow.guest.to(['read', 'write'])
    ],
  })
});
