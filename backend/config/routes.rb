Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :characters, only: [:index, :show, :update]
    end
  end
  namespace :api do
    namespace :v1 do
      resources :levels, only: [:index, :show]
    end
  end
  namespace :api do
    namespace :v1 do
      resources :monsters, only: [:index, :show, :update]
    end
  end
  namespace :api do
    namespace :v1 do
      resources :items, only: [:index, :show]
    end
  end
end
