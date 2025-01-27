export type IModel = {
  _id: string | null
  updated_at: Date | null
  created_at: Date | null
}

// Define a type for nested association labels
type NestedAssocLabel<T> = {
  [K in keyof T]?: string | NestedAssocLabel<T[K]>
}

export abstract class Model implements IModel {
  // PROPERTIES
  _id: string | null
  updated_at: Date | null
  created_at: Date | null
  private assocLabel: NestedAssocLabel<this> = {}

  protected constructor(params: IModel) {
    const { _id, created_at, updated_at } = params
    this._id = _id ?? null
    this.updated_at = updated_at ? new Date(updated_at) : null
    this.created_at = created_at ? new Date(created_at) : null
    this.assocLabel._id = 'ID'
    this.assocLabel.updated_at = 'Mise à jour'
    this.assocLabel.created_at = 'Créé'
  }

  // Méthode statique pour créer un modèle à partir de données API
  // Créer une instance de la classe spécifique avec les données
  static fromApi<I extends IModel, M extends Model>(this: new (params: I) => M, data: I): M {
    const instance = new this(data)

    // Itérer sur les propriétés de l'objet "data" et les assigner dynamiquement
    Object.keys(data).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(instance, key) && data[key] !== undefined) {
        // Vérifier si la propriété est une date
        if (key === 'updated_at' || key === 'created_at') {
          instance[key] = data[key] ? new Date(data[key]) : null
        } else {
          instance[key] = data[key] // Remplir la propriété de l'instance
        }
      }
    })

    return instance
  }
}
