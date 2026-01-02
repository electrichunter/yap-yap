-- Add Expenses Table for "Transparent Vault"
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID, -- FK to jobs (handle partitioning logic or loose reference)
    date DATE DEFAULT CURRENT_DATE,
    item VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50), -- 'material', 'labor', 'other'
    has_receipt BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add Timeline Table for "Live Tracking"
CREATE TABLE project_timeline (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID,
    date DATE DEFAULT CURRENT_DATE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- 'completed', 'in-progress', 'pending'
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
