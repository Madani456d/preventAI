CREATE TABLE public.health_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  user_name TEXT NOT NULL DEFAULT '',
  age INTEGER NOT NULL,
  gender TEXT NOT NULL DEFAULT 'prefer_not_to_say',
  height_cm NUMERIC,
  weight_kg NUMERIC,
  symptoms TEXT[] NOT NULL DEFAULT '{}',
  severity TEXT NOT NULL DEFAULT 'mild',
  duration TEXT NOT NULL DEFAULT 'recent',
  existing_conditions TEXT NOT NULL DEFAULT '',
  medications TEXT NOT NULL DEFAULT '',
  sleep_hours NUMERIC NOT NULL DEFAULT 7,
  activity TEXT NOT NULL DEFAULT 'some',
  water_glasses INTEGER NOT NULL DEFAULT 6,
  stress TEXT NOT NULL DEFAULT 'moderate',
  smoking BOOLEAN NOT NULL DEFAULT false,
  alcohol TEXT NOT NULL DEFAULT 'none',
  diet TEXT NOT NULL DEFAULT 'balanced',
  free_text TEXT NOT NULL DEFAULT '',
  detected_symptoms TEXT[] NOT NULL DEFAULT '{}',
  score INTEGER NOT NULL DEFAULT 0,
  risk_level TEXT NOT NULL DEFAULT 'low',
  possible_areas TEXT[] NOT NULL DEFAULT '{}',
  risk_factors TEXT[] NOT NULL DEFAULT '{}',
  recommendations JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT health_assessments_score_range CHECK (score >= 0 AND score <= 100),
  CONSTRAINT health_assessments_risk_level CHECK (risk_level IN ('low', 'moderate', 'high'))
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.health_assessments TO authenticated;
GRANT ALL ON public.health_assessments TO service_role;

ALTER TABLE public.health_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own assessments"
  ON public.health_assessments FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own assessments"
  ON public.health_assessments FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own assessments"
  ON public.health_assessments FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own assessments"
  ON public.health_assessments FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX health_assessments_user_created_idx
  ON public.health_assessments (user_id, created_at DESC);