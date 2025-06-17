import moduleAlias from 'module-alias';
import path from 'path';

// Setup module aliases for production
moduleAlias.addAliases({
  '@': path.join(__dirname, '..'),
  '@/types': path.join(__dirname, '..', 'types'),
  '@/controllers': path.join(__dirname, '..', 'controllers'),
  '@/services': path.join(__dirname, '..', 'services'),
  '@/middleware': path.join(__dirname, '..', 'middleware'),
  '@/routes': path.join(__dirname, '..', 'routes'),
  '@/utils': path.join(__dirname, '..', 'utils'),
  '@/config': path.join(__dirname, '..', 'config'),
  '@/schemas': path.join(__dirname, '..', 'schemas'),
});

export default moduleAlias; 