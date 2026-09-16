-- 1. Tabla Principal: Listings
CREATE TABLE listings (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    capacity INT NOT NULL,
    weather VARCHAR(100) NOT NULL,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    photos JSONB NOT NULL DEFAULT '[]'::jsonb,
    videos JSONB DEFAULT '[]'::jsonb,
    
    -- Estado flexible (VARCHAR)
    -- Ejemplos: 'ACTIVE', 'INACTIVE', 'DRAFT', 'DELETED', 'MAINTENANCE', 'PENDING'
    state VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    deleted_at TIMESTAMP WITH TIME ZONE NULL,
    
    -- Campos de Auditoría
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(36) NOT NULL,
    updated_by VARCHAR(36) NULL
);

-- 2. Tabla: Comodities
CREATE TABLE comodities (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    
    -- Estado
    state VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    deleted_at TIMESTAMP WITH TIME ZONE NULL,
    
    -- Campos de Auditoría
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(36) NOT NULL,
    updated_by VARCHAR(36) NULL
);

-- 3. Tabla Intermedia: Listing_Comodities (Muchos a Muchos)
CREATE TABLE listing_comodities (
    listing_id VARCHAR(36) NOT NULL,
    comodity_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (listing_id, comodity_id),
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    FOREIGN KEY (comodity_id) REFERENCES comodities(id) ON DELETE CASCADE
);

-- 4. Tabla: Categories
CREATE TABLE categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    
    -- Estado
    state VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    deleted_at TIMESTAMP WITH TIME ZONE NULL,
    
    -- Campos de Auditoría
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(36) NOT NULL,
    updated_by VARCHAR(36) NULL
);

-- 5. Tabla Intermedia: Listing_Categories (Muchos a Muchos)
CREATE TABLE listing_categories (
    listing_id VARCHAR(36) NOT NULL,
    category_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (listing_id, category_id),
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Índices GIN para JSONB
CREATE INDEX idx_listings_photos ON listings USING gin (photos);
CREATE INDEX idx_listings_videos ON listings USING gin (videos);

-- Índice optimizado para búsquedas por estado
CREATE INDEX idx_listings_state ON listings (state);


-- 1. Creación del tipo ENUM para los roles
CREATE TYPE user_role AS ENUM ('admin', 'user', 'owner');

-- 2. Creación de la tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    identificacion VARCHAR(20) UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'user',
    phone VARCHAR(20),
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Inserción masiva de 400 usuarios con datos ficticios
INSERT INTO users (nombre, identificacion, role, phone, email, password)
SELECT 
    -- Nombre aleatorio combinado
    (ARRAY['Carlos', 'Ana', 'Luis', 'Maria', 'Jorge', 'Sofia', 'Pedro', 'Lucia', 'Diego', 'Elena'])[1 + floor(random() * 10)] || ' ' ||
    (ARRAY['Gomez', 'Rodriguez', 'Lopez', 'Martinez', 'Perez', 'García', 'Sánchez', 'Torres', 'Ramírez', 'Flores'])[1 + floor(random() * 10)] AS nombre,
    
    -- Identificación única de 8 a 10 dígitos
    (10000000 + gs.i)::text AS identificacion,
    
    -- Distribución aleatoria de roles
    (ARRAY['admin', 'user', 'owner']::user_role[])[1 + floor(random() * 3)] AS role,
    
    -- Número de teléfono ficticio
    '+573' || lpad((floor(random() * 89999999 + 10000000))::text, 8, '0') AS phone,
    
    -- Email único
    'usuario' || gs.i || '@ejemplo.com' AS email,
    
    -- Hash simulado de contraseña
    '$2b$10$e8T8fE/xM0.Y.3Q9bQZ7uO8N.0Xk2yJ1v3w4x5y6z7a8b9c0d1e2f' AS password
FROM generate_series(1, 400) AS gs(i);