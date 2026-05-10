CREATE TABLE audits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  audit_input jsonb NOT NULL,
  audit_result jsonb NOT NULL,
  total_spend numeric,
  total_savings numeric,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id uuid REFERENCES audits(id),
  email text NOT NULL,
  company text,
  role text,
  team_size int,
  high_savings boolean,
  created_at timestamptz DEFAULT now()
);
