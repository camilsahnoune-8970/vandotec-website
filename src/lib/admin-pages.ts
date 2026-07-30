import { readFileSync, statSync } from 'fs';
import { join } from 'path';

export interface PageFile {
  slug: string;
  label: string;
  file: string;
  lastModified?: string;
}

const root = process.cwd();

export function getPageFiles(): PageFile[] {
  return [
    { slug: 'home', label: 'Homepage', file: 'src/data/home.json' },
    { slug: 'contact', label: 'Contact', file: 'src/data/contact.json' },
    { slug: 'expertises', label: 'Expertises', file: 'src/data/expertises.json' },
    { slug: 'jobs', label: 'Jobs', file: 'src/data/jobs.json' },
    { slug: 'over-vandotec', label: 'Over Vandotec', file: 'src/data/over-vandotec.json' },
    { slug: 'service-onderhoud', label: 'Service & Onderhoud', file: 'src/data/service-onderhoud.json' }
  ];
}

export function readPageFile(slug: string): string {
  const map: Record<string, string> = {
    home: 'src/data/home.json',
    contact: 'src/data/contact.json',
    expertises: 'src/data/expertises.json',
    jobs: 'src/data/jobs.json',
    'over-vandotec': 'src/data/over-vandotec.json',
    'service-onderhoud': 'src/data/service-onderhoud.json'
  };
  return readFileSync(join(root, map[slug]), 'utf-8');
}

export function resolvePageSlug(file: string): string | undefined {
  const match = file.match(/^src\/data\/(.+)\.json$/);
  return match?.[1];
}
